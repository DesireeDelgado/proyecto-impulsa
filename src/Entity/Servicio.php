<?php

namespace App\Entity;

use App\Repository\ServicioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServicioRepository::class)]
class Servicio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $tipo = null;

    #[ORM\Column]
    private ?float $precio_mensual = null;

    #[ORM\Column]
    private ?bool $activa = null;

    /**
     * @var Collection<int, Contrato>
     */
    #[ORM\OneToMany(targetEntity: Contrato::class, mappedBy: 'servicio')]
    private Collection $contratos;

    public function __construct()
    {
        $this->contratos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(string $tipo): static
    {
        $this->tipo = $tipo;

        return $this;
    }

    public function getPrecioMensual(): ?float
    {
        return $this->precio_mensual;
    }

    public function setPrecioMensual(float $precio_mensual): static
    {
        $this->precio_mensual = $precio_mensual;

        return $this;
    }

    public function isActiva(): ?bool
    {
        return $this->activa;
    }

    public function setActiva(bool $activa): static
    {
        $this->activa = $activa;

        return $this;
    }

    /**
     * @return Collection<int, Contrato>
     */
    public function getContratos(): Collection
    {
        return $this->contratos;
    }

    public function addContrato(Contrato $contrato): static
    {
        if (!$this->contratos->contains($contrato)) {
            $this->contratos->add($contrato);
            $contrato->setServicio($this);
        }

        return $this;
    }

    public function removeContrato(Contrato $contrato): static
    {
        if ($this->contratos->removeElement($contrato)) {
            // set the owning side to null (unless already changed)
            if ($contrato->getServicio() === $this) {
                $contrato->setServicio(null);
            }
        }

        return $this;
    }
}
